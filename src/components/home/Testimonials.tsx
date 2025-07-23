"use client";

import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

export default function Testimonials() {
  return (
    <section className="py-20 px-6 md:px-20 bg-green-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug mb-6">
            The <span className="text-green-600">premium</span> freelance <br />
            solution for businesses
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800 mb-8">
            <div>
              <div className="flex items-start gap-2 mb-1">
                <FaCheckCircle className="text-green-500 mt-1" />
                <span className="font-semibold">Dedicated hiring experts</span>
              </div>
              <p className="text-sm text-gray-600">
                Count on an account manager to find you the right talent and see
                to your project’s every need.
              </p>
            </div>

            <div>
              <div className="flex items-start gap-2 mb-1">
                <FaCheckCircle className="text-green-500 mt-1" />
                <span className="font-semibold">Satisfaction guarantee</span>
              </div>
              <p className="text-sm text-gray-600">
                Order confidently, with guaranteed refunds for
                less-than-satisfactory deliveries.
              </p>
            </div>

            <div>
              <div className="flex items-start gap-2 mb-1">
                <FaCheckCircle className="text-green-500 mt-1" />
                <span className="font-semibold">Advanced management tools</span>
              </div>
              <p className="text-sm text-gray-600">
                Seamlessly integrate freelancers into your team and projects.
              </p>
            </div>

            <div>
              <div className="flex items-start gap-2 mb-1">
                <FaCheckCircle className="text-green-500 mt-1" />
                <span className="font-semibold">Flexible payment models</span>
              </div>
              <p className="text-sm text-gray-600">
                Pay per project or opt for hourly rates to facilitate
                longer-term collaboration.
              </p>
            </div>
          </div>

          <button className="bg-black text-white px-6 py-2 rounded font-medium hover:bg-gray-800 transition">
            Try Now
          </button>
        </div>

        {/* Image Section */}
        <div className="relative">
          <Image
            src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/349c9d727ea08dc1692aceaccd1b8462-1736065983970/Image_Fiverr%20pro.png"
            alt="Fiverr Pro Team"
            width={600}
            height={400}
            className="rounded-xl shadow-xl object-cover w-full"
          />

          {/* Project Status badge */}
          <div className="absolute top-4 right-4 bg-white shadow px-4 py-2 rounded-full text-sm font-medium text-gray-700 flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500" />
            Project Status: <span className="text-black">92%</span>
          </div>

          {/* Chart demo (optional) */}
          <div className="absolute bottom-4 left-4 bg-white shadow-md px-4 py-2 rounded-xl text-xs text-gray-600">
            <p>$8,900</p>
            <div className="flex gap-1 mt-1">
              {["Jan", "Feb", "Mar", "Apr", "May"].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
