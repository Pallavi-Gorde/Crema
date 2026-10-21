// Café Crema — Nocturne Edition (light). Dishes showcase + table reservations.
const MENU = [
  { id: 1, name: "Signature Double Espresso", cat: "Coffee & Brews", price: 180, img: "espresso_crema.jpg", desc: "Estate beans, thick golden crema." },
  { id: 2, name: "Sea Salt Caramel Iced Latte", cat: "Coffee & Brews", price: 260, img: "caramel_latte.jpg", desc: "House caramel, flaky sea salt, cold milk." },
  { id: 3, name: "18-Hour Nitro Cold Brew", cat: "Coffee & Brews", price: 280, img: "cold_brew.jpg", desc: "Slow-steeped, velvety nitrogen cascade." },
  { id: 4, name: "Lotus Biscoff Frappe", cat: "Coffee & Brews", price: 320, img: "biscoff_frappe.jpg", desc: "Speculoos cream, biscuit crumble." },
  { id: 5, name: "Truffle Cheese Nachos", cat: "Small Plates", price: 390, img: "truffle_nachos.jpg", desc: "Cheese sauce, jalapeño, truffle shavings." },
  { id: 6, name: "Wood-Fired Burrata Pizza", cat: "Mains & Pizza", price: 650, img: "burrata_pizza.jpg", desc: "San Marzano, fresh burrata, basil." },
  { id: 7, name: "Truffle Mushroom Fettuccine", cat: "Mains & Pizza", price: 520, img: "truffle_pasta.jpg", desc: "Handmade pasta, wild mushrooms, parmesan." },
  { id: 8, name: "Cheesy Butter Chicken & Naan", cat: "Mains & Pizza", price: 560, img: "butter_chicken.jpg", desc: "Our signature, with garlic naan." },
  { id: 9, name: "Crema Espresso Tiramisu", cat: "Desserts", price: 340, img: "crema_tiramisu.jpg", desc: "Mascarpone, house espresso, cocoa." },
  { id: 10, name: "Basque Burnt Cheesecake", cat: "Desserts", price: 360, img: "burnt_cheesecake.jpg", desc: "Caramelised top, berry compote." },
];
const $ = (s) => document.querySelector(s);
const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
function toast(t) { const el = $("#toast"); el.textContent = t; el.classList.add("on"); setTimeout(() => el.classList.remove("on"), 2200); }
const cats = ["All", ...new Set(MENU.map((m) => m.cat))];
$("#filters").innerHTML = cats.map((c, i) => `<button class="${i ? "" : "on"}" data-c="${c}">${c}</button>`).join("");
$("#filters").onclick = (e) => {
  if (!e.target.dataset.c) return;
  document.querySelectorAll("#filters button").forEach((b) => b.classList.toggle("on", b === e.target));
  renderMenu(e.target.dataset.c);
};
function renderMenu(c = "All") {
  $("#menuGrid").innerHTML = MENU.filter((m) => c === "All" || m.cat === c).map((m) => `
    <div class="card"><img src="${m.img}" alt="${m.name}" loading="lazy"><div class="body">
    <h3>${m.name}</h3><p>${m.desc}</p><div class="row"><span class="price">${inr(m.price)}</span></div></div></div>`).join("");
}
renderMenu();
const d = document.querySelector('#reserveForm [name=date]'); d.min = new Date().toISOString().slice(0, 10);
$("#reserveForm").onsubmit = (e) => {
  e.preventDefault(); const f = Object.fromEntries(new FormData(e.target));
  $("#reserveMsg").textContent = `Thank you ${f.name}! Your table for ${f.guests} on ${f.date} at ${f.time} is requested. We'll call you on ${f.phone} to confirm.`;
  toast("Reservation received"); e.target.reset();
};
$("#burger").onclick = () => $("#navLinks").classList.toggle("open");
document.querySelectorAll("#navLinks a").forEach((a) => a.onclick = () => $("#navLinks").classList.remove("open"));
const nav = $("#nav"); addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 40));
