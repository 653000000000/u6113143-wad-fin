import dbConnect from "@/lib/db";
import Customer from "@/models/Customer";

export async function GET() {
  await dbConnect();
  const customers = await Customer.find();
  return Response.json(customers);
}

export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  const customer = new Customer(body);
  await customer.save();
  return Response.json(customer);
}

export async function PUT(request) {
  await dbConnect();
  const body = await request.json();
  const customer = await Customer.findByIdAndUpdate(body._id, body, { new: true });
  if (!customer) {
    return new Response("Customer not found", { status: 404 });
  }
  return Response.json(customer);
}