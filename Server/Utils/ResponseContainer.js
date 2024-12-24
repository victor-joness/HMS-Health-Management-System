export const sendResponse = (res, status, code, message, data) => {
  res.status(code).json({
    status,
    code,
    message,
    data,
  });
};