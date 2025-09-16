import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { ShopContext } from "../context/ShopContextCore";
import { toast } from "react-toastify";
import Title from "../components/Title";

const Contact = () => {
  const { t } = useTranslation();
  const { backendUrl } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!backendUrl || backendUrl.trim() === "") {
      toast.error(t("contact.backend_missing"));
      console.log("backendUrl:", backendUrl);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);

      console.log("Form Data Being Sent:", {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      const headers = {
        Authorization: token ? `Bearer ${token}` : "",
      };

      console.log("Request Headers:", headers);

      const response = await fetch(`${backendUrl}/api/contact`, {
        method: "POST",
        headers: headers,
        body: formDataToSend,
      });

      console.log("Response Status:", response.status);
      console.log("Response OK:", response.ok);

      const responseData = await response.text();
      console.log("Raw Response:", responseData);

      const parsedResponse = responseData ? JSON.parse(responseData) : {};
      console.log("Parsed Response Data:", parsedResponse);

      if (response.ok) {
        toast.success(parsedResponse.message || t("contact.sent_success"));
        setFormData({ name: "", email: "", message: "" });
      } else {
        // عرض رسالة الخطأ من الخادم
        const errorMessage =
          parsedResponse.data?.message?.[0] || parsedResponse.message || "";
        toast.error(
          errorMessage
            ? t("contact.failed_with_reason", { message: errorMessage })
            : t("contact.failed")
        );
      }
    } catch (error) {
      console.error("Error Details:", error);
      toast.error(t("contact.send_error"));
    }
  };

  return (
    <div id="contact">
      <Title
        text1={t("contact.title_part1")}
        text2={t("contact.title_part2")}
      />
      <h1 className="text-center max-w-3xl mx-auto mt-4 text-md">
        {t("contact.description")}
      </h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto pt-8">
        <div className="flex flex-wrap md:flex-nowrap md:gap-4 gap-2">
          <div className="w-full md:w-1/2 text-left">
            {t("contact.form.name_label")}
            <input
              type="text"
              className="bg-gray-200 dark:bg-gray-700 w-full border border-gray-300 rounded py-3 px-4 mt-2"
              name="name"
              placeholder={t("contact.form.name_placeholder")}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full md:w-1/2 text-left">
            {t("contact.form.email_label")}
            <input
              type="email"
              className="bg-gray-200 dark:bg-gray-700 w-full border border-gray-300 rounded py-3 px-4 mt-2"
              name="email"
              placeholder={t("contact.form.email_placeholder")}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="my-6 text-left">
          {t("contact.form.message_label")}
          <textarea
            name="message"
            placeholder={t("contact.form.message_placeholder")}
            className="bg-gray-200 dark:bg-gray-700 w-full border border-gray-300 rounded py-3 px-4 mt-2 h-48 resize-none"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 hover:bg-blue-400"
        >
          {t("contact.form.submit")}
        </button>
      </form>
    </div>
  );
};

export default Contact;
