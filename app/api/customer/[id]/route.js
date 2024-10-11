import dbConnect from "@/lib/db";
import Customer from "@/models/Customer";

export async function GET(request, { params }) {
  await dbConnect();
  const id = params.id;
  const customer = await Customer.findById(id);
  if (!customer) {
    return new Response("Customer not found", { status: 404 });
  }
  return Response.json(customer);
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const id = params.id;
  const customer = await Customer.findByIdAndDelete(id);
  if (!customer) {
    return new Response("Customer not found", { status: 404 });
  }
  return Response.json(customer);
}