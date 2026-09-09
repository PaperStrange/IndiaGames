import React from 'react';

/** The live sheet is projected separately from its decorative depth and light. */
export function BookLayers() {
    return <div className="book-layers" aria-hidden="true">
        <div className="folio-ground" />
        <div className="book-cover" />
        <div className="page-block-bottom" /><div className="page-block-side" />
        <div className="paper-leaves"><i /><i /><i /><i /><i /></div>
        <div className="book-spine" />
        <div className="book-ribbon" />
    </div>;
}

export function ParchmentMaterial({ pageKey }: { pageKey: string }) {
    return <>
        {['tl', 'tr', 'br', 'bl'].map(c => <i className={`plane-corner ${c}`} key={c} aria-hidden="true" />)}
        <div className="vellum-grain" aria-hidden="true" />
        <div className="vellum-light" aria-hidden="true"><div className="candle-pool" /><div className="candle-reflection" /></div>
        <div className="vellum-contour" aria-hidden="true" />
        <div className="folio-gutter" aria-hidden="true" /><div className="folio-rim" aria-hidden="true" />
        <div className="folio-lamplight" aria-hidden="true" />
        <div className="page-light-sweep" key={pageKey} aria-hidden="true" />
    </>;
}
