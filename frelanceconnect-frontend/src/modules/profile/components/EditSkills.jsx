import { useState } from "react";

const EditSkills = ({ value = [], onChange }) => {
  const [input, setInput] = useState("");

  const addSkill = () => {
    if (!input.trim()) return;

    const updated = [
      ...value,
      { name: input.trim() },
    ];

    onChange(updated);
    setInput("");
  };

  const removeSkill = (index) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div>
      <label className="font-bold mb-2 block">
        Skills
      </label>

      <div className="flex gap-2 mb-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add skill"
          className="border p-2 rounded-lg w-full"
        />

        <button
          type="button"
          onClick={addSkill}
          className="bg-blue-600 text-white px-4 rounded-lg"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {value.map((s, i) => (
          <span
            key={i}
            className="bg-gray-200 px-3 py-1 rounded-full cursor-pointer"
            onClick={() => removeSkill(i)}
          >
            {s.name} ✕
          </span>
        ))}
      </div>
    </div>
  );
};

export default EditSkills;