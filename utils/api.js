export const callPublic = async () => {
  try {
    const response = await fetch("/api/public");
    if (!response.ok) throw response;
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const callPrivate = async () => {
  try {
    const response = await fetch("/api/private", {
      headers: {
        Accept: "application/json; charset=utf-8",
      },
    });
    if (!response.ok) throw response;
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const callRBAC = async () => {
  try {
    const response = await fetch("/api/rbac", {
      headers: {
        Accept: "application/json; charset=utf-8",
      },
    });
    if (!response.ok) throw response;
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};
