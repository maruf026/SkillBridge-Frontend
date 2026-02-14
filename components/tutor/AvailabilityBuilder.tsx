"use client";

import { useState } from "react";

const DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export default function AvailabilityBuilder() {
  const [availability, setAvailability] = useState<
    Record<string, { from: string; to: string }[]>
  >({});

  const [slot, setSlot] = useState({
    day: "MONDAY",
    from: "",
    to: "",
  });

  const addSlot = () => {
    if (!slot.from || !slot.to) return;

    setAvailability((prev) => ({
      ...prev,
      [slot.day]: [
        ...(prev[slot.day] || []),
        { from: slot.from, to: slot.to },
      ],
    }));

    setSlot({ ...slot, from: "", to: "" });
  };

  const removeSlot = (day: string, index: number) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">

      <h2 className="font-bold">Weekly Availability</h2>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <select
          value={slot.day}
          onChange={(e) =>
            setSlot({ ...slot, day: e.target.value })
          }
          className="border rounded-lg px-3 py-2"
        >
          {DAYS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <input
          type="time"
          value={slot.from}
          onChange={(e) =>
            setSlot({ ...slot, from: e.target.value })
          }
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="time"
          value={slot.to}
          onChange={(e) =>
            setSlot({ ...slot, to: e.target.value })
          }
          className="border rounded-lg px-3 py-2"
        />

        <button
          type="button"
          onClick={addSlot}
          className="bg-indigo-600 text-white rounded-lg"
        >
          Add
        </button>
      </div>

      {/* Display Slots */}
      <div className="space-y-3">
        {Object.entries(availability).map(([day, slots]) =>
          slots.length > 0 ? (
            <div key={day}>
              <p className="font-bold text-sm">{day}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {slots.map((s, i) => (
                  <div
                    key={i}
                    className="bg-slate-100 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {s.from} - {s.to}
                    <button
                      type="button"
                      onClick={() => removeSlot(day, i)}
                      className="text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>

      {/* Hidden Input for Server Action */}
      <input
        type="hidden"
        name="availability"
        value={JSON.stringify(availability)}
      />
    </div>
  );
}
