import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../Auth/AuthProvider";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [payDetails, setPayDetails] = useState([]);
  const [invoice, setInvoice] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      fetch(`http://localhost:5000/paymentData?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          const validPayments = data.filter(
            (payment) => payment.status === "VALID"
          );
          setPayDetails(validPayments);
        });
    }
  }, [user]);

  // Invoices
  const handleInvoice = (pay) => {
    setInvoice((viewInvoice) => [...viewInvoice, pay]);
  };

  // Download Invoice
  const handleDownload = (invoice) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Invoice", 14, 22);

    const logo= '../../../public/main-icon.jpeg'
    doc.addImage(logo, 'JPEG', 15, 10, 30, 30);
    const invoiceDetails = [
      { title: "Restaurant Name:", value: "Food Court" },
      { title: "Payment Method:", value: invoice.payment_method },
      { title: "Email:", value: invoice.user_email },
      { title: "Amount:", value: `${invoice.amount} ${invoice.currency}` },
      { title: "Status:", value: invoice.status },
      { title: "Date:", value: invoice.payment_date },
    ];

    invoiceDetails.forEach((detail, index) => {
      doc.text(`${detail.title} ${detail.value}`, 14, 40 + index * 10);
    });

    const tableColumn = ["Description", "Value"];
    const tableRows = [
      ["Invoice ID", invoice._id],
      ["Transaction ID", invoice.transaction_id || "N/A"], 
    ];

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 100,
      theme: "grid",
    });
    // Save the PDF
    doc.save(`Invoice_${invoice._id}.pdf`);
  };

  return (
    <div className="grid">
      <Helmet>
        <title>Food Court | Orders</title>
      </Helmet>

      <div className="flex flex-col items-center justify-center mt-24">
        <div className="w-full max-w-8xl px-4 py-6">
          <div className="mb-8">
            <p className="font-bold lg:text-4xl text-3xl text-green-800">
              Past Orders:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-green-700 text-white text-lg">
                <tr>
                  <th className="py-2 px-4">Payment Method</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Amount</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {payDetails
                  .filter((pay) => pay.user_email === user.email) // Filter for the logged-in user's email
                  .map((pay) => (
                    <tr key={pay._id} className="text-center border-b">
                      <td className="py-2 px-4 font-semibold">
                        {pay.payment_method}
                      </td>
                      <td className="py-2 px-4 font-semibold">
                        {pay.user_email}
                      </td>
                      <td className="py-2 px-4 font-semibold">
                        {pay.amount} {pay.currency}
                      </td>
                      <td className="py-2 px-4 font-semibold">{pay.status}</td>
                      <td className="py-2 px-4 font-semibold">
                        {pay.payment_date}
                      </td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => handleInvoice(pay)}
                          className="bg-blue-500 text-white py-1 px-3 rounded"
                        >
                          Collect Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Invoices</h2>
            {invoice.length > 0 ? (
              <ul className="list-disc pl-5">
                {invoice.map((inv, index) => (
                  <li key={index} className="mb-2">
                    Invoice for {inv.payment_method} - Amount: {inv.amount} {inv.currency}
                    <button
                      onClick={() => handleDownload(inv)}
                      className="ml-2 text-blue-500 underline"
                    >
                      Download
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No invoices collected yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
