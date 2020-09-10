export const API_MENUS = `/api/rbac/menu`

export const API_PC_AREA_AREA = '/baseservice/pc/area/area'; // are1075 area列表 - PC用
export const API_PC_AREA_PATHID = '/baseservice/pc/area/pathid/:pathid'; // are1305 根据path_id获取省市区
export const API_FILE_UPLOAD = '/public/oss/upload'; // 上传
export const API_INITIALIZE_ENUM = '/public/initialize/enum'; // 枚举
export const API_LOGIN = '/public/auth/login';
export const API_VERIFY_CODE = '/api/verify-code'; // 验证码
export const API_USER_INFO = '/api/auth/userinfo'; // 登录用户信息
export const API_AUTH_USER_MODPWD = '/api/auth/change'; // 修改密码

// 员工管理
export const API_AUTH_AUTHUSER = '/api/auth/authuser';     // aut1686 员工列表  aut1129 新增员工
export const API_AUTH_AUTHUSER_ID = '/api/auth/authuser/:id';     // aut1755 员工单条  aut1821 修改员工
export const API_AUTH_LOCK_ID = '/api/auth/lock/:id';     // aut1755 员工单条  aut1821 修改员工
export const API_AUTH_NORMAL_ID = '/api/auth/normal/:id';     // aut1755 员工单条  aut1821 修改员工
export const API_AUTH_USEUSER = '/api/auth/useuser';     // aut1687 使用人列表(下拉)
export const API_RBAC_ROLE = '/api/rbac/role';     // rba1538 角色列表(checkbox)