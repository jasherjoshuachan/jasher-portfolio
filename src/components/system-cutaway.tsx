import { BadgeCheck, FileCheck2, MessageSquareText, Play } from "lucide-react";

const rooms = [
  { index: "01", title: "Intent", copy: "Capture the request with its source and useful context.", icon: MessageSquareText },
  { index: "02", title: "Approved", copy: "Apply the right boundary before a system can act.", icon: BadgeCheck },
  { index: "03", title: "Action", copy: "Run the narrow, authorized path and handle exceptions.", icon: Play },
  { index: "04", title: "Receipt", copy: "Read back the result from the system that owns it.", icon: FileCheck2 },
];

export function SystemCutaway() {
  return (
    <section className="cutaway" aria-labelledby="cutaway-title">
      <div className="cutaway-label"><span id="cutaway-title">How I think about agent work</span><span>One path, four checks</span></div>
      <div className="cutaway-rooms">
        <span className="proof-signal" aria-hidden="true" />
        {rooms.map(({ index, title, copy, icon: Icon }) => (
          <article className="room" key={title}>
            <Icon className="room-icon" strokeWidth={1.4} aria-hidden="true" />
            <span className="room-index">{index}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </div>
      <p className="cutaway-caption">The moving signal is only a visual cue. The model stays readable without it: intent is captured, approval is checked, action is bounded, and completion is read back.</p>
    </section>
  );
}
