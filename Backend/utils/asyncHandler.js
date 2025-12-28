const asyncHandler = (reqHandler) => {
    return (req,res,next) => {
        Promise.resolve(reqHandler(req, res, next))
        .catch((error) => next(error))
    }
}

export {asyncHandler}

// const asyncHandler = (fn) => {
//   return (req, res, next) => {
//     Promise.resolve(fn(req, res, next)).catch(next);
//   };
// };

// export { asyncHandler };
