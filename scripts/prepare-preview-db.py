import pathlib
import sqlite3

root = pathlib.Path(__file__).resolve().parents[1]
databases = list((root / '.wrangler/state/v3/d1/miniflare-D1DatabaseObject').glob('*.sqlite'))
databases = [path for path in databases if path.name != 'metadata.sqlite']
if len(databases) != 1:
    raise RuntimeError('Start the notebook preview to initialize exactly one local D1 database.')
with sqlite3.connect(databases[0]) as connection:
    connection.execute('CREATE TABLE IF NOT EXISTS notebook_preview_migrations (name TEXT PRIMARY KEY)')
    for migration in sorted((root / 'drizzle').glob('*.sql')):
        if connection.execute('SELECT 1 FROM notebook_preview_migrations WHERE name=?', (migration.name,)).fetchone():
            continue
        # 直接使用项目迁移文件和真实 SQLite 数据库，不替换运行时请求。
        connection.executescript(migration.read_text())
        connection.execute('INSERT INTO notebook_preview_migrations(name) VALUES(?)', (migration.name,))
        print('Applied preview migration:', migration.name)
