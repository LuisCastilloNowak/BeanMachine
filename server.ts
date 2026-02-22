import express from "express";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase Configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://gfultedpamkroivycmgm.supabase.co";
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_aK_52jGcxKZr3x1tClKqdg_i99M0SV4";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/auth/pin", (req, res) => {
    const { pin } = req.body;
    if (pin === "2012") {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "Code PIN incorrect" });
    }
  });

  app.post("/api/auth/employee-pin", (req, res) => {
    const { pin } = req.body;
    if (pin === "2209") {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "Code PIN employé incorrect" });
    }
  });

  // Menu Items
  app.get("/api/menu", async (req, res) => {
    const { data, error } = await supabase.from("menu_items").select("*");
    if (error) return res.status(500).json(error);
    res.json(data);
  });

  app.post("/api/menu", async (req, res) => {
    const { category, name, description, price } = req.body;
    const { data, error } = await supabase.from("menu_items").insert([{ category, name, description, price }]).select();
    if (error) return res.status(500).json(error);
    res.json({ id: data[0].id });
  });

  app.put("/api/menu/:id", async (req, res) => {
    const { category, name, description, price } = req.body;
    const { error } = await supabase.from("menu_items").update({ category, name, description, price }).eq("id", req.params.id);
    if (error) return res.status(500).json(error);
    res.json({ success: true });
  });

  app.delete("/api/menu/:id", async (req, res) => {
    const { error } = await supabase.from("menu_items").delete().eq("id", req.params.id);
    if (error) return res.status(500).json(error);
    res.json({ success: true });
  });

  // Reviews
  app.get("/api/reviews", async (req, res) => {
    const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    if (error) return res.status(500).json(error);
    res.json(data);
  });

  app.post("/api/reviews", async (req, res) => {
    const { author, rating, comment } = req.body;
    const { data, error } = await supabase.from("reviews").insert([{ author, rating, comment }]).select();
    if (error) return res.status(500).json(error);
    res.json({ id: data[0].id });
  });

  app.delete("/api/reviews/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const { data, error, count } = await supabase.from("reviews").delete().eq("id", id).select();
      if (error) throw error;
      if (data && data.length > 0) {
        res.json({ success: true });
      } else {
        res.status(404).json({ success: false, message: "Avis non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  });

  // Accounting
  app.get("/api/accounting", async (req, res) => {
    const { data, error } = await supabase.from("accounting").select("*").order("date", { ascending: false });
    if (error) return res.status(500).json(error);
    res.json(data);
  });

  app.post("/api/accounting", async (req, res) => {
    const { type, label, amount } = req.body;
    const { data, error } = await supabase.from("accounting").insert([{ type, label, amount }]).select();
    if (error) return res.status(500).json(error);
    res.json({ id: data[0].id });
  });

  app.delete("/api/accounting/:id", async (req, res) => {
    const { error } = await supabase.from("accounting").delete().eq("id", req.params.id);
    if (error) return res.status(500).json(error);
    res.json({ success: true });
  });

  // Contact Messages
  app.get("/api/messages", async (req, res) => {
    const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    if (error) return res.status(500).json(error);
    res.json(data);
  });

  app.post("/api/messages", async (req, res) => {
    const { name, email, subject, message } = req.body;
    const { data, error } = await supabase.from("contact_messages").insert([{ name, email, subject, message }]).select();
    if (error) return res.status(500).json(error);
    res.json({ id: data[0].id });
  });

  app.put("/api/messages/:id/archive", async (req, res) => {
    const { error } = await supabase.from("contact_messages").update({ status: "ARCHIVED" }).eq("id", req.params.id);
    if (error) return res.status(500).json(error);
    res.json({ success: true });
  });

  app.delete("/api/messages/:id", async (req, res) => {
    const { error } = await supabase.from("contact_messages").delete().eq("id", req.params.id);
    if (error) return res.status(500).json(error);
    res.json({ success: true });
  });

  // Contracts
  app.get("/api/contracts", async (req, res) => {
    const { data, error } = await supabase.from("contracts").select("*").order("created_at", { ascending: false });
    if (error) return res.status(500).json(error);
    res.json(data);
  });

  app.post("/api/contracts", async (req, res) => {
    const { company_name, nature, status, info } = req.body;
    const { data, error } = await supabase.from("contracts").insert([{ company_name, nature, status, info }]).select();
    if (error) return res.status(500).json(error);
    res.json({ id: data[0].id });
  });

  app.put("/api/contracts/:id", async (req, res) => {
    const { company_name, nature, status, info } = req.body;
    const { error } = await supabase.from("contracts").update({ company_name, nature, status, info }).eq("id", req.params.id);
    if (error) return res.status(500).json(error);
    res.json({ success: true });
  });

  app.delete("/api/contracts/:id", async (req, res) => {
    const { error } = await supabase.from("contracts").delete().eq("id", req.params.id);
    if (error) return res.status(500).json(error);
    res.json({ success: true });
  });

  // Ingredients
  app.get("/api/ingredients", async (req, res) => {
    const { data, error } = await supabase.from("ingredients").select("*");
    if (error) return res.status(500).json(error);
    res.json(data);
  });

  app.post("/api/ingredients", async (req, res) => {
    const { name, quantity, purchase_price } = req.body;
    const { data, error } = await supabase.from("ingredients").insert([{ name, quantity, purchase_price }]).select();
    if (error) return res.status(500).json(error);
    res.json({ id: data[0].id });
  });

  app.put("/api/ingredients/:id", async (req, res) => {
    const { quantity, purchase_price } = req.body;
    const { error } = await supabase.from("ingredients").update({ quantity, purchase_price }).eq("id", req.params.id);
    if (error) return res.status(500).json(error);
    res.json({ success: true });
  });

  app.delete("/api/ingredients/:id", async (req, res) => {
    const { error } = await supabase.from("ingredients").delete().eq("id", req.params.id);
    if (error) return res.status(500).json(error);
    res.json({ success: true });
  });

  // Products
  app.get("/api/products", async (req, res) => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) return res.status(500).json(error);
    res.json(data);
  });

  app.post("/api/products", async (req, res) => {
    const { name, quantity, manufacturing_cost, selling_price } = req.body;
    const { data, error } = await supabase.from("products").insert([{ name, quantity, manufacturing_cost, selling_price }]).select();
    if (error) return res.status(500).json(error);
    res.json({ id: data[0].id });
  });

  app.put("/api/products/:id", async (req, res) => {
    const { quantity, manufacturing_cost, selling_price } = req.body;
    const { error } = await supabase.from("products").update({ quantity, manufacturing_cost, selling_price }).eq("id", req.params.id);
    if (error) return res.status(500).json(error);
    res.json({ success: true });
  });

  app.delete("/api/products/:id", async (req, res) => {
    const { error } = await supabase.from("products").delete().eq("id", req.params.id);
    if (error) return res.status(500).json(error);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
