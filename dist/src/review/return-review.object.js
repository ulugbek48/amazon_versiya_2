"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnReviewObject = void 0;
const return_user_object_1 = require("../user/return-user.object");
exports.returnReviewObject = {
    user: {
        select: return_user_object_1.returnUser
    },
    createdAt: true,
    text: true,
    rating: true,
    id: true
};
//# sourceMappingURL=return-review.object.js.map