"use client";
import { useState } from "react";
import { Input, Button, Textarea, Select, SelectItem } from "@heroui/react";

export default function AddPromptForm() {

  console.log(req.body)
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    
    const formData = {
      title: e.target.title.value,
      details: e.target.details.value,
      price: parseFloat(e.target.price.value),
      category: e.target.category.value, 
      status: "pending"
    };

    try {
      const res = await fetch('http://localhost:5000/api/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      console.log("Server Response:", data);

      if (res.ok) {
        alert("Prompt submitted!");
        e.target.reset();
        alert("Failed: " + data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-xl font-bold">Add New Prompt</h2>
      <Input label="Prompt Title" placeholder="Enter title" isRequired />
      <Textarea label="Prompt Details" placeholder="Enter your AI prompt here" isRequired />
      <Input label="Price" type="number" placeholder="0.00" />
      <Select label="Category">
        <SelectItem key="coding">Coding</SelectItem>
        <SelectItem key="writing">Writing</SelectItem>
        <SelectItem key="design">Design</SelectItem>
      </Select>
      <Button color="primary" type="submit" isLoading={loading}>
        Submit for Approval
      </Button>
    </form>
  );
}