"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { contactHandleErrorMessage } from "@/lib/validation";

export function ContactForm() {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    handle?: string;
    message?: string;
  }>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nameError = name.trim() ? undefined : "Please enter your name";
    const handleError = contactHandleErrorMessage(handle) ?? undefined;
    const messageError = message.trim() ? undefined : "Please enter a message";

    const nextErrors = {
      name: nameError,
      handle: handleError,
      message: messageError,
    };
    setErrors(nextErrors);
    if (nameError || handleError || messageError) return;

    toast.success("Message sent \u2014 we will reply soon!");
    setName("");
    setHandle("");
    setMessage("");
  }

  return (
    <div>
      <h2 className="mb-1 font-display text-[28px] text-warmwhite">
        Send a Message
      </h2>
      <p className="mb-8 text-[13px] text-muted">
        We usually reply within a few hours
      </p>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            value={name}
            invalid={!!errors.name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name)
                setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            placeholder="Your name"
            autoComplete="name"
            aria-describedby="contact-name-error"
          />
          {errors.name && (
            <p
              id="contact-name-error"
              role="alert"
              className="mt-1.5 text-[11px] text-[#d97066]"
            >
              &#9888; {errors.name}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="contact-handle">Phone or Instagram</Label>
          <Input
            id="contact-handle"
            value={handle}
            invalid={!!errors.handle}
            onChange={(e) => {
              const v = e.target.value;
              setHandle(v);
              setErrors((prev) => ({
                ...prev,
                handle: v
                  ? (contactHandleErrorMessage(v) ?? undefined)
                  : undefined,
              }));
            }}
            placeholder="+374 XX XXX XXX or @handle"
            autoComplete="tel"
            aria-describedby="contact-handle-error"
          />
          {errors.handle && (
            <p
              id="contact-handle-error"
              role="alert"
              className="mt-1.5 text-[11px] text-[#d97066]"
            >
              &#9888; {errors.handle}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="contact-message">Message</Label>
          <Textarea
            id="contact-message"
            rows={5}
            value={message}
            invalid={!!errors.message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (errors.message)
                setErrors((prev) => ({ ...prev, message: undefined }));
            }}
            placeholder="What fragrance are you looking for?"
            aria-describedby="contact-message-error"
          />
          {errors.message && (
            <p
              id="contact-message-error"
              role="alert"
              className="mt-1.5 text-[11px] text-[#d97066]"
            >
              &#9888; {errors.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full justify-center">
          Send Message
        </Button>
      </form>
    </div>
  );
}
