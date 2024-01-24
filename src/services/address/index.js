import Cookies from "js-cookie";

// 7:26:17
export const addNewAddress = async (formData) => {
  try {
    const res = await fetch("/api/address/add-new-address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

// 7:27:10
// 7:28:49
export const fetchAllAddresses = async (id) => {
  try {
    const res = await fetch(`/api/address/get-all-address?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

// 7:29:24
export const updateAddress = async (formData) => {
  try {
    const res = await fetch("/api/address/update-address", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

// 7:30:12
export const deleteAddress = async (id) => {
  try {
    const res = await fetch(`/api/address/delete-address?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};
