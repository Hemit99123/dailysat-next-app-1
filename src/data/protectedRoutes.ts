const protectedRoutes = {
    protectedAuth: ['/', '/shop', '/math', '/reading-writing'],
    protectedEmployeeBackend: ['/api/protected-employee'],
    protectedEmployeeFrontend: ['/api-docs'],
    employeeAuthorize: ['/employee-authorize', '/employee-authorize/logout'],
};

export default protectedRoutes