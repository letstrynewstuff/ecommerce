import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  Bell,
  MessageCircle,
  Menu,
  User,
  MoreVertical,
} from "lucide-react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Tracking() {
  const { trackingCode } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // -------------------------
  // FETCH TRACKING DATA
  // -------------------------
  useEffect(() => {
    async function fetchTracking() {
      try {
        const res = await fetch(
          `${API_URL}/api/locations/track/${trackingCode}`
        );

        if (!res.ok) {
          throw new Error("Tracking code not found");
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTracking();
  }, [trackingCode]);

  // -------------------------
  // STATUS → PROGRESS LOGIC
  // -------------------------

  function getProgressCount(status) {
    switch (status) {
      case "Pending":
      case "On Hold":
        return 2;
      case "In Transit":
        return 3;
      case "Delivered":
        return 4;
      default:
        return 2;
    }
  }

  const totalDots = 4;
  const activeDots = getProgressCount(data?.status);

  // -------------------------
  // DATE FORMATTERS
  // -------------------------
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  // -------------------------
  // STATES
  // -------------------------
  if (loading)
    return <div className="min-h-screen grid place-items-center">Loading…</div>;

  if (error)
    return (
      <div className="min-h-screen grid place-items-center text-red-600">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-purple-700 text-white p-4 flex justify-between items-center">
        <span className="text-2xl font-bold">SECURECOMM</span>
        <div className="flex gap-4">
          <User />
          <Menu />
        </div>
      </header>

      {/* TITLE */}
      <div className="bg-white border-b px-4 py-3 flex justify-between">
        <h1 className="text-xl text-gray-700">Tracking</h1>
        <MoreVertical />
      </div>

      {/* CONTENT */}
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* STATUS */}
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <span className="px-4 py-1 border rounded-full font-semibold">
            {data.status}
          </span>

          <h2 className="mt-4 text-2xl font-semibold">
            {formatDate(data.eta)}
          </h2>
          <p className="text-gray-600">before {formatTime(data.eta)}</p>
        </div>

        {/* PROGRESS BAR */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            {[...Array(totalDots)].map((_, i) => (
              <React.Fragment key={i}>
                <div
                  className={`w-4 h-4 rounded-full ${
                    i < activeDots ? "bg-purple-700" : "bg-gray-300"
                  }`}
                />
                {i < totalDots - 1 && (
                  <div
                    className={`flex-1 h-1 ${
                      i < activeDots - 1 ? "bg-purple-700" : "bg-gray-300"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="text-center mt-4">
            <h3 className="font-semibold text-lg">{data.status}</h3>
            <p className="text-gray-600">Current Location</p>
            <p className="font-semibold">{data.currentLocation}</p>
          </div>

          <button className="mx-auto mt-6 flex items-center text-blue-600">
            GET STATUS UPDATES <ChevronRight />
          </button>
        </div>

        {/* SHIPMENT FACTS */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Shipment Facts</h2>

          {[
            ["Tracking Code", data.trackingCode],
            ["Status", data.status],
            ["From", data.from],
            ["To", data.to],
            ["Estimated Delivery", formatDate(data.eta)],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between py-2 border-b last:border-none"
            >
              <span className="text-gray-600">{label}</span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
        </div>

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-2 gap-4">
          <button className="border-2 border-purple-700 text-purple-700 rounded-lg py-3 flex justify-center gap-2">
            <Bell /> Notifications
          </button>
          <button className="border-2 border-purple-700 text-purple-700 rounded-lg py-3 flex justify-center gap-2">
            <MessageCircle /> Support
          </button>
        </div>
      </div>

      {/* FLOATING CHAT */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-purple-700 text-white rounded-full shadow-lg grid place-items-center">
        <MessageCircle />
      </button>
    </div>
  );
}
