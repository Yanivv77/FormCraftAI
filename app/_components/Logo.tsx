"use client"
import React from "react";
export default function Logo() {
  return (
    <svg width="300" height="60" viewBox="0 0 300 60" aria-label="FormCraftAI logo">
      <defs>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0066cc" />
          <stop offset="50%" stopColor="#00ccff" />
          <stop offset="100%" stopColor="#0066cc" />
        </linearGradient>
      </defs>
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill="url(#blueGradient)"
        fontSize="40"
        fontWeight="700"
        fontFamily="'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
        letterSpacing="-1"
      >
        FormCraftAI
      </text>
    </svg>
  )
}