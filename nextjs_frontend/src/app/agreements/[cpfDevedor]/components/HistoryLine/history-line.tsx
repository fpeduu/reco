import { Proposta } from "@/models/Acordos";
import HistoryLineItem from "../HistoryLineItem/history-line-item";

import { fromEvent, Subscription } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { useEffect, useRef } from "react";

interface HistoryLineProps {
  divida: number;
  history: Proposta[];
}

export default function HistoryLine({ divida, history }: HistoryLineProps) {
  const draggableRef = useRef<HTMLDivElement | null>(null);
  const subscriptionRef = useRef<Subscription | null>(null);

  useEffect(() => {
    if (draggableRef.current) {
      const touchStart$ = fromEvent<TouchEvent>(draggableRef.current, "touchstart");
      const touchMove$ = fromEvent<TouchEvent>(document, "touchmove");
      const touchEnd$ = fromEvent<TouchEvent>(document, "touchend");

      const dragSubscription = touchStart$
        .pipe(
          switchMap((startEvent) => {
            const initialX = startEvent.touches[0].clientX;
            const initialY = startEvent.touches[0].clientY;

            return touchMove$.pipe(
              map((moveEvent) => {
                moveEvent.preventDefault();
                const clientX = moveEvent.touches[0].clientX;
                const clientY = moveEvent.touches[0].clientY;
                const deltaX = clientX - initialX;
                const deltaY = clientY - initialY;
                return { deltaX, deltaY };
              }),
              takeUntil(touchEnd$)
            );
          })
        )
        .subscribe({
          next: ({ deltaX, deltaY }) => {
            if (draggableRef.current) {
              draggableRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            }
          }
        });

      subscriptionRef.current = dragSubscription;
    }

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, []);

  return (
    <div ref={draggableRef} className="w-full">
      <HistoryLineItem align="right" connect={true} />
      {history.map((proposal, index) => (
        <HistoryLineItem
          key={index}
          divida={divida}
          proposal={proposal}
          align={proposal.autor === "Bot" ? "right" : "left"}
          connect={index !== history.length - 1}
        />
      ))}
    </div>
  );
}
