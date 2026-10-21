"""Original Vivid props. Run with Blender 4.3: blender -b --python art/build_models.py.

Coordinates passed to helpers use the runtime's X/right, Y/up, Z/towards viewer.
Blender works Z/up; glTF restores the runtime convention on export. No add-ons,
downloaded meshes, texture baking, or paid services are required.
"""
from pathlib import Path
import json
import math
import bpy
from mathutils import Vector

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "art"
OUT.mkdir(parents=True, exist_ok=True)


def material(name, color, roughness=.65, metallic=0, emission=0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    shader = mat.node_tree.nodes.get("Principled BSDF")
    rgb = tuple(int(color[i:i+2], 16) / 255 for i in (1, 3, 5))
    # Hex values describe sRGB. Blender's material inputs are scene-linear.
    linear = tuple(v / 12.92 if v <= .04045 else ((v + .055) / 1.055) ** 2.4 for v in rgb)
    shader.inputs["Base Color"].default_value = (*linear, 1)
    shader.inputs["Roughness"].default_value = roughness
    shader.inputs["Metallic"].default_value = metallic
    if emission:
        shader.inputs["Emission Color"].default_value = (*linear, 1)
        shader.inputs["Emission Strength"].default_value = emission
    return mat


def reset():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)


def pos(p):
    return (p[0], -p[2], p[1])


def box(name, loc, size, mat, bevel=0):
    bpy.ops.mesh.primitive_cube_add(size=1, location=pos(loc))
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = (size[0], size[2], size[1])
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if bevel:
        modifier = obj.modifiers.new("Worn edges", "BEVEL")
        modifier.width = bevel
        modifier.segments = 3
        bpy.ops.object.modifier_apply(modifier=modifier.name)
        obj.modifiers.new("Corner normals", "WEIGHTED_NORMAL")
    obj.data.materials.append(mat)
    return obj


def cylinder(name, loc, radius, depth, mat, vertices=24, axis="y", radius2=None):
    if radius2 is None:
        bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=pos(loc))
    else:
        bpy.ops.mesh.primitive_cone_add(vertices=vertices, radius1=radius, radius2=radius2, depth=depth, location=pos(loc))
    obj = bpy.context.object
    obj.name = name
    if axis == "z":
        obj.rotation_euler.x = math.pi / 2
    elif axis == "x":
        obj.rotation_euler.y = math.pi / 2
    obj.data.materials.append(mat)
    for polygon in obj.data.polygons:
        polygon.use_smooth = len(polygon.vertices) == 4
    return obj


def line(name, a, b, radius, mat):
    start, end = Vector(pos(a)), Vector(pos(b))
    middle = (start + end) / 2
    bpy.ops.mesh.primitive_cylinder_add(vertices=8, radius=radius, depth=(end - start).length, location=middle)
    obj = bpy.context.object
    obj.name = name
    obj.rotation_euler = (end - start).to_track_quat("Z", "Y").to_euler()
    obj.data.materials.append(mat)
    return obj


def export(name, preserve=()):
    # Batch static geometry by material to keep draw calls small, while leaving
    # named story props separate for presentational state updates.
    mats = {}
    for obj in list(bpy.context.scene.objects):
        if obj.type == "MESH" and obj.name not in preserve:
            mats.setdefault(obj.data.materials[0].name, []).append(obj)
    for material_name, objects in mats.items():
        bpy.ops.object.select_all(action="DESELECT")
        for obj in objects:
            obj.select_set(True)
        bpy.context.view_layer.objects.active = objects[0]
        bpy.ops.object.join()
        bpy.context.object.name = f"{name}_{material_name}"
    bpy.ops.object.select_all(action="SELECT")
    path = OUT / f"{name}.glb"
    bpy.ops.export_scene.gltf(filepath=str(path), export_format="GLB", export_yup=True,
                             export_cameras=False, export_lights=False, export_apply=True)
    triangles = 0
    for obj in bpy.context.scene.objects:
        if obj.type == "MESH":
            obj.data.calc_loop_triangles()
            triangles += len(obj.data.loop_triangles)
    return {"file": path.name, "bytes": path.stat().st_size, "source_triangles": triangles,
            "mesh_objects": len([o for o in bpy.context.scene.objects if o.type == "MESH"])}


reset()
wood = material("Walnut", "#674638", .78)
wood_dark = material("End grain", "#3b302a", .86)
grain = material("Wood wear", "#976b4b", .8)
brass = material("Brushed brass", "#b5985d", .43, .55)
brass_dark = material("Aged brass", "#6c6045", .67, .38)
paper = material("Cotton paper", "#e4d4ae", .95)
ink = material("Blue pencil", "#556f6d", .88)
cloth = material("Linen", "#bac3ae", .98)
glow = material("Lamp glass", "#ffe3a0", .5, emission=.9)
backing = material("Portrait backing", "#243c40", .9)

# The frame is a real shallow object: side papers and the lower recess retain
# visible depth as the reader leans. The painted plane is inserted at z=.135.
box("Back", (0, .25, -.04), (2.92, 3.81, .19), backing, .04)
for x in (-1.43, 1.43):
    box("Upright", (x, .25, .04), (.21, 3.92, .34), wood, .045)
    box("Inner brass", (x * .916, .25, .175), (.035, 3.64, .06), brass, .008)
    box("Outer wear", (x * 1.053, .25, .15), (.018, 3.82, .035), grain, .006)
for y in (-1.64, 2.14):
    box("Cross rail", (0, y, .05), (3.06, .22, .35), wood, .045)
    box("Inner brass", (0, y + (.105 if y < 0 else -.105), .175), (2.64, .035, .06), brass, .008)
    box("Rail wear", (0, y + (-.078 if y < 0 else .078), .17), (2.89, .015, .025), grain, .005)
for x in (-1.43, 1.43):
    for y in (-1.64, 2.14):
        box("Corner brass", (x, y, .24), (.245, .245, .03), brass_dark, .035)
        cylinder("Rivet", (x, y, .265), .023, .02, brass, 16, axis="z")
        line("Rivet slot", (x-.013, y, .277), (x+.013, y, .277), .0025, wood_dark)
# Stand, ledge, worn notch and the notch's loose wedge.
box("Foot", (0, -1.89, -.05), (3.36, .16, .82), wood_dark, .04)
box("Ledge", (0, -1.76, .16), (3.25, .14, .70), wood, .03)
box("Lip", (0, -1.69, .49), (3.25, .12, .05), grain, .018)
box("Notch", (.72, -1.626, .264), (.12, .055, .035), wood_dark, .009)
box("Wedge", (.9, -1.625, .37), (.12, .07, .14), grain, .012)
for x in (-1.12, -.6, .18, .86):
    line("Ledge grain", (x-.2, -1.68, .32), (x+.15, -1.68, .35), .003, grain)
# Partially hidden documents are deliberately abstract; gameplay text lives in
# accessible story content, so recasting cannot leave contradictory texture text.
left_note = box("Side note", (-1.49, .28, -.17), (.42, .87, .018), paper, .008)
for i in range(7):
    box("Ledger rule", (-1.59, .53-i*.085, -.151), (.20 + (i % 3)*.02, .009, .003), ink)
box("Side plate", (1.49, .37, -.14), (.4, .7, .035), brass_dark, .025)
for y, width in ((.53, .06), (.37, .14), (.21, .06)):
    box("Plate mark", (1.59, y, -.116), (width, .035, .007), paper, .006)
# A small signal lamp: warm glass, dark cage, visibly off-balance shade until
# braced. Dynamic meshes are excluded from static batching.
cylinder("Lamp foot", (1.07, -1.58, .45), .23, .07, brass_dark)
cylinder("Lamp column", (1.07, -1.31, .45), .053, .48, brass)
cylinder("Lamp bowl", (1.07, -1.07, .45), .17, .09, brass_dark)
cylinder("LampGlow", (1.07, -.89, .45), .11, .30, glow)
for dx in (-.14, .14):
    line("Lamp cage", (1.07+dx, -1.05, .45), (1.07+dx, -.74, .45), .013, brass)
cylinder("LampShade", (1.07, -.71, .45), .27, .19, brass, 32, radius2=.10)
cylinder("Shade cap", (1.07, -.585, .45), .055, .08, brass_dark)
# The three return props are mutually exclusive in the renderer. Original
# private letter, authorized dedication and neutral cleaning cloth stay distinct.
box("LetterProp", (-.76, -1.57, .27), (.50, .29, .026), paper, .008)
box("DedicationProp", (1.42, .83, .285), (.50, .31, .026), paper, .008)
cylinder("Cloth peg", (-1.5, -.53, .26), .026, .16, brass_dark, 16, axis="z")
box("ClothProp", (-1.5, -.77, .34), (.30, .52, .065), cloth, .035)
frame = export("frame", ("Wedge", "LampShade", "LampGlow", "LetterProp", "DedicationProp", "ClothProp"))

reset()
table_wood = material("Painted table", "#475d58", .87)
table_edge = material("Table edge", "#2e423e", .9)
lightbox_rim = material("Lightbox maple", "#a89165", .82)
lightbox_edge = material("Lightbox bevel", "#d1bb88", .85)
lightbox_glass = material("Lightbox glass", "#e1e5c6", .7, emission=.15)
paint_red = material("Old sienna", "#ae6f4b", .92)
paint_blue = material("Old teal", "#477875", .92)
metal = material("Steel clip", "#949d8d", .45, .45)

box("Table", (0, 0, -.18), (5.12, 3.78, .22), table_wood, .06)
box("Front edge", (0, -1.83, -.11), (5.12, .14, .3), table_edge, .04)
for y in (-1.05, -.33, .42, 1.12):
    line("Board joint", (-2.51, y, -.061), (2.51, y+.02, -.061), .006, table_edge)
for x,y in ((-2.14,1.33), (2.2,-1.38), (1.98,1.42),(-2.15,-1.3)):
    for k in range(3):
        box("Paint scrape", (x + k*.065,y + k*.015,-.052), (.035,.13,.005), paint_blue if x < 0 else paint_red, .003)
box("Lightbox body", (.05, .03, .01), (3.98, 2.86, .16), lightbox_rim, .06)
box("Lightbox edge", (.05, .03, .1), (3.8, 2.68, .04), lightbox_edge, .025)
box("Lit glass", (.05, .03, .13), (3.63, 2.53, .026), lightbox_glass, .02)
# Seven registration notches are visual, but the story reducer owns which
# semantic notch is aligned. The renderer never reports alignment success.
for index in range(7):
    box("Registration notch", (-.55+index*.2,-1.33,.129), (.018,.065,.014), ink, .003)
box("Underlay corner", (-1.69,1.24,.17), (.19,.11,.012), paper, .006)
box("Clip", (-1.57,1.34,.19), (.36,.1,.027), metal, .02)
box("Clip inner", (-1.57,1.34,.207), (.23,.04,.006), table_edge, .008)
box("Timetable", (-2.13,.18,.025), (.48,1.3,.027), paper,.008)
for i in range(10):
    box("Timetable line", (-2.13,.63-i*.09,.042), (.33,.009,.004), ink)
line("Cancellation", (-2.3,.67,.048), (-1.97,-.35,.048), .009, paint_red)
line("Cancellation", (-1.97,.67,.048), (-2.3,-.35,.048), .009, paint_red)
# Paintbrush and pencil use the same surface convention as the paper plane.
line("Brush handle", (2.11,-.65,.03), (2.14,.67,.03), .032, paint_red)
line("Brush ferrule", (2.14,.67,.03), (2.15,.85,.03), .04, metal)
line("Brush hair", (2.15,.85,.03), (2.16,1.08,.03), .045, wood_dark)
line("Pencil", (1.96,-1.32,.03), (2.3,.3,.03), .021, lightbox_edge)
line("Pencil nib", (1.96,-1.32,.03), (1.94,-1.41,.03), .014, ink)
cylinder("Paint pot", (-2.18,-1.18,.075), .19, .14, metal, 24, axis="z")
cylinder("Paint surface", (-2.18,-1.18,.15), .15, .012, paint_blue, 24, axis="z")
workbench = export("workbench")

report = {"generator": "art/build_models.py", "blender_version": bpy.app.version_string,
          "models": [frame, workbench], "note": "Geometry/material counts, not physical-device FPS."}
(OUT / "model-metrics.json").write_text(json.dumps(report, indent=2) + "\n")
print(json.dumps(report, indent=2))
