"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandCreate = cmd => ({ cmd });
exports.Commands = {
    signin: exports.commandCreate('singin'),
    signup: exports.commandCreate('signup'),
    userById: exports.commandCreate('user-by-id')
};
//# sourceMappingURL=index.js.map