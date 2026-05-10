"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;

type LeadState = {
  success: boolean;
  message: string;
};

export async function submitLead(
  prevState: LeadState,
  formData: FormData
): Promise<LeadState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const companySize = formData.get("companySize") as string;

  // Server-side validation
  if (!name || name.trim().length < 2) {
    return { success: false, message: "Please enter your full name." };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  if (!companySize) {
    return { success: false, message: "Please select your company size." };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.from("leads").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company_size: companySize,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Supabase error:", error);
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }

    return {
      success: true,
      message: "Thank you! Your growth audit is on its way.",
    };
  } catch (err) {
    console.error("Lead submission error:", err);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
