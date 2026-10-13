"use client";
import { useId, useRef } from "react";
import { Arrow } from "./arrow";
import { event } from "@/lib/event";
export function Action({
  href,
  children,
  className = "",
  pending = "Le prenotazioni saranno disponibili a breve.",
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  pending?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const id = useId();
  if (href)
    return (
      <a
        className={`action ${className}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <Arrow />
      </a>
    );
  return (
    <>
      <button
        className={`action ${className}`}
        onClick={() => dialog.current?.showModal()}
      >
        {children}
        <Arrow />
      </button>
      <dialog
        ref={dialog}
        aria-labelledby={id}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div>
          <p className="eyebrow">FOBIA · {event.date}</p>
          <h2 id={id}>
            LA NOTTE
            <br />
            SI AVVICINA.
          </h2>
          <p>{pending}</p>
          <button
            autoFocus
            className="action"
            onClick={() => dialog.current?.close()}
          >
            CHIUDI <span aria-hidden="true">×</span>
          </button>
        </div>
      </dialog>
    </>
  );
}
