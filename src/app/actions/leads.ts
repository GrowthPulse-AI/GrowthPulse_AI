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
  const monthlyBudget = formData.get("monthlyBudget") as string;

  // UTM params (from hidden fields)
  const utmSource = formData.get("utm_source") as string | null;
  const utmMedium = formData.get("utm_medium") as string | null;
  const utmCampaign = formData.get("utm_campaign") as string | null;
  const utmTerm = formData.get("utm_term") as string | null;
  const utmContent = formData.get("utm_content") as string | null;

  // Server-side validation
  if (!name || name.trim().length < 2) {
    return { success: false, message: "Please enter your full name." };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  if (!monthlyBudget) {
    return { success: false, message: "Please select your monthly marketing budget." };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.from("leads").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      monthly_budget: monthlyBudget,
      utm_source: utmSource || null,
      utm_medium: utmMedium || null,
      utm_campaign: utmCampaign || null,
      utm_term: utmTerm || null,
      utm_content: utmContent || null,
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
