"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import React from "react";
import { Input } from "../ui/input";



/* ---------------- Schema ---------------- */
const movieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  synopsis: z.string().optional(),
  releaseYear: z.coerce
    .number()
    .min(1888, "Invalid year")
    .max(new Date().getFullYear())
    .optional(),
  director: z.string().optional(),
  cast: z.string().optional(),
  streamingPlatforms: z.string().min(1, "Required"),
  pricing: z.enum(["FREE", "PAID"]),
  posterUrl: z.string().url("Invalid URL").optional(),
  trailerUrl: z.string().url("Invalid URL").optional(),
});

/* ---------------- Component ---------------- */
const AddMovieForm = () => {
  const form = useForm({
    defaultValues: {
      title: "",
      synopsis: "",
      releaseYear: "",
      director: "",
      cast: "",
      streamingPlatforms: "",
      pricing: "FREE",
      posterUrl: "",
      trailerUrl: "",
    },
validators: {
  onSubmit: ({ value }) => {
    const result = movieSchema.safeParse(value);

    if (!result.success) {
      return result.error.flatten().fieldErrors;
    }

    return undefined;
  },
},
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Adding movie...");
      try {
        const formattedData = {
          ...value,
          releaseYear: value.releaseYear
            ? Number(value.releaseYear)
            : undefined,
          streamingPlatforms: value.streamingPlatforms
            .split(",")
            .map((p) => p.trim()),
        };

        console.log(formattedData); // send to backend

        toast.success("Movie added successfully", { id: toastId });
        form.reset();
      } catch (error) {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      {/* Title */}
      <form.Field name="title">
        {(field) => (
          <div>
            <label className="block mb-1">Title</label>
            <Input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <p className="text-red-500 text-sm">
              {field.state.meta.errors?.[0]}
            </p>
          </div>
        )}
      </form.Field>

      {/* Synopsis */}
      <form.Field name="synopsis">
        {(field) => (
          <div>
            <label className="block mb-1">Synopsis</label>
            <Input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>

      {/* Release Year */}
      <form.Field name="releaseYear">
        {(field) => (
          <div>
            <label className="block mb-1">Release Year</label>
            <Input
              type="number"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <p className="text-red-500 text-sm">
              {field.state.meta.errors?.[0]}
            </p>
          </div>
        )}
      </form.Field>

      {/* Director */}
      <form.Field name="director">
        {(field) => (
          <div>
            <label className="block mb-1">Director</label>
            <Input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>

      {/* Cast */}
      <form.Field name="cast">
        {(field) => (
          <div>
            <label className="block mb-1">Cast (comma separated)</label>
            <Input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>

      {/* Streaming Platforms */}
      <form.Field name="streamingPlatforms">
        {(field) => (
          <div>
            <label className="block mb-1">
              Platforms (comma separated)
            </label>
            <Input
              placeholder="Netflix, Disney+"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <p className="text-red-500 text-sm">
              {field.state.meta.errors?.[0]}
            </p>
          </div>
        )}
      </form.Field>

      {/* Pricing */}
      <form.Field name="pricing">
        {(field) => (
          <div>
            <label className="block mb-1">Pricing</label>
            <select
              className="w-full border p-2 rounded"
              value={field.state.value}
              onChange={(e) =>
                field.handleChange(e.target.value as "FREE" | "PAID")
              }
            >
              <option value="FREE">FREE</option>
              <option value="PAID">PAID</option>
            </select>
          </div>
        )}
      </form.Field>

      {/* Poster URL */}
      <form.Field name="posterUrl">
        {(field) => (
          <div>
            <label className="block mb-1">Poster URL</label>
            <Input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>

      {/* Trailer URL */}
      <form.Field name="trailerUrl">
        {(field) => (
          <div>
            <label className="block mb-1">Trailer URL</label>
            <Input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>

      {/* Submit */}
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Add Movie"}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
};

export default AddMovieForm;