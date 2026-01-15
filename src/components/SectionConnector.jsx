import React from 'react';

export default function SectionConnector() {
    return (
        <div className="w-full flex flex-col items-center justify-center py-6 opacity-30 select-none pointer-events-none">
            {/* Top Line */}
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-white to-transparent"></div>

            {/* Center Dot/Cross */}
            <div className="flex items-center gap-2 my-2">
                <div className="h-px w-4 bg-white/50"></div>
                <div className="w-1.5 h-1.5 rounded-full border border-white bg-black"></div>
                <div className="h-px w-4 bg-white/50"></div>
            </div>

            {/* Bottom Line */}
            <div className="w-px h-12 bg-gradient-to-t from-transparent via-white to-transparent"></div>
        </div>
    );
}
