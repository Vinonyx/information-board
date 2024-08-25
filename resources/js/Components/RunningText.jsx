import React from "react";

export default function RunningText({ text }) {
    return (
        <div className="marquee">
            <div className="marquee-content text-xl">{text}</div>
        </div>
    );
}
