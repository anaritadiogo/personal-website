"use client"

import ClickQuantum from "@/components/ClickQuantum";

export default function TestClickPage() {
  return (
    <ClickQuantum>
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <div className="text-center text-black">
          <h1 className="text-4xl mb-4">Click Anywhere to Test Effect</h1>
          <p className="text-lg text-gray-600">You should see red particles appear at your cursor</p>
        </div>
      </div>
    </ClickQuantum>
  );
}
