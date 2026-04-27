"use client";

import { useState } from "react";
import CustomSelect, { type SelectOption } from "./CustomSelect";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwpvgwqq";

const SERVICE_OPTIONS: SelectOption[] = [
  { value: "painting", label: "Painting" },
  { value: "epoxy", label: "Epoxy" },
  { value: "both", label: "Both" },
  { value: "not-sure", label: "Not sure yet" },
];

const PROPERTY_OPTIONS: SelectOption[] = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "new-build", label: "New build" },
  { value: "other", label: "Other" },
];

const BUDGET_OPTIONS: SelectOption[] = [
  { value: "under-2k", label: "Under $2,000" },
  { value: "2k-5k", label: "$2,000 — $5,000" },
  { value: "5k-10k", label: "$5,000 — $10,000" },
  { value: "10k-25k", label: "$10,000 — $25,000" },
  { value: "25k-plus", label: "$25,000+" },
  { value: "not-sure", label: "Not sure yet" },
];

const TIMELINE_OPTIONS: SelectOption[] = [
  { value: "asap", label: "ASAP" },
  { value: "within-month", label: "Within a month" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "exploring", label: "Just exploring" },
];

const inputClass =
  "w-full bg-transparent border-b border-white/20 hover:border-white/40 focus:border-red-500 py-3 text-white placeholder:text-white/30 text-sm transition-colors duration-300 focus:outline-none";

const labelClass = "block text-[10px] uppercase tracking-[0.25em] text-white/50 mb-3";

export default function ContactForm() {
  const [service, setService] = useState("");
  const [property, setProperty] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");

  return (
    <form action={FORMSPREE_ENDPOINT} method="POST" className="space-y-8">
      <div className="grid sm:grid-cols-2 gap-8">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your name <span className="text-red-500 ml-1">*</span>
          </label>
          <input type="text" id="name" name="name" className={inputClass} required />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-red-500 ml-1">*</span>
          </label>
          <input type="email" id="email" name="email" className={inputClass} required />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-8">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="text-red-500 ml-1">*</span>
          </label>
          <input type="tel" id="phone" name="phone" className={inputClass} required />
        </div>
        <CustomSelect
          name="service"
          label="Service"
          options={SERVICE_OPTIONS}
          value={service}
          onChange={setService}
          required
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-8">
        <CustomSelect
          name="property"
          label="Property type"
          options={PROPERTY_OPTIONS}
          value={property}
          onChange={setProperty}
          required
        />
        <CustomSelect
          name="budget"
          label="Estimated budget"
          options={BUDGET_OPTIONS}
          value={budget}
          onChange={setBudget}
          required
        />
      </div>

      <CustomSelect
        name="timeline"
        label="Timeline"
        options={TIMELINE_OPTIONS}
        value={timeline}
        onChange={setTimeline}
      />

      <div>
        <label htmlFor="message" className={labelClass}>
          Project details <span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us about your space, the work you have in mind, anything we should know."
          className={`${inputClass} resize-none`}
          required
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/70 text-white text-sm font-medium uppercase tracking-[0.2em] transition-all duration-500 ease-out hover:bg-white hover:text-black hover:border-white"
        >
          Send request
          <svg
            className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </form>
  );
}
