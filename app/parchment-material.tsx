import React from 'react';

/** Decorative layers never receive pointer events or alter the ink coordinate plane. */
export function BookLayers() {
    return <div className="book-layers" aria-hidden="true">
        <div className="book-cover" />
        <div className="paper-leaves"><i /><i /><i /><i /><i /></div>
        <div className="book-spine" />
        <div className="book-ribbon" />
    </div>;
}

export function ParchmentMaterial({ pageKey }: { pageKey: string }) {
    return <>
        <div className="vellum-grain" aria-hidden="true" />
        <div className="vellum-light" aria-hidden="true"><div className="candle-pool" /><div className="candle-reflection" /></div>
        <div className="vellum-contour" aria-hidden="true" />
        <div className="page-light-sweep" key={pageKey} aria-hidden="true" />
    </>;
}
