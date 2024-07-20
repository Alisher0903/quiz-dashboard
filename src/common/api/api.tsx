// swagger url => base
const base_url: string = 'http://161.35.214.247:8080/';

// ESLATMA: URL OXRIDA => / QUYILGAN BULSA YOKI ID KETADI YOKI TEXT YANI SEARCHLAR UCHUN
// ============ ALL 50 TA API =============

//================= USER ISHLATILMAYDI RESULT CONTROLLER====================
export const result_get_all: string = `${base_url}result/users/`; //PAGINATION buladi bu api va yana bittasi detailni kurish uchun  xam ishlatiladi

//=================REGION CONTROLLER====================
export const region_get_one: string = `${base_url}region/`; // bita region get qilish id keladi
export const region_update: string = `${base_url}region/`; // admin region update qiladi id keladi
export const region_delete: string = `${base_url}region/`; // admin region delete qiladi
export const region_all: string = `${base_url}region`; // admin or client all region get qiladi
export const region_add: string = `${base_url}region`; // admin region qushadi

//==============DISTRICT CONTROLLER==========================
export const district_get_all: string = `${base_url}district`; // all district get
export const district_update: string = `${base_url}district`; // admin district update
export const district_add: string = `${base_url}district`; // admin district add
export const district_get_one: string = `${base_url}district/`; // bitta district get qilish
export const district_delete: string = `${base_url}district/`; // district delete qilish
export const district_region_filter: string = `${base_url}district/districts/`; // districtni region lar id buyicha get qilish

//=================QUESTION CONTROLLER===================
export const question_update: string = `${base_url}question/`; // edit or delete id keladi admin uchun
export const question_delete: string = `${base_url}question/`;
export const question_add: string = `${base_url}question`; //admin question qushadi
export const question_search: string = `${base_url}question/searchText/`; //admin or client question search qiladi
export const question_category_all: string = `${base_url}question/list/`; //admin category buyicha question get qiladi

//================CONTACT CONTROLLER======================
export const contact_all: string = `${base_url}contact`; //all contact ni get qilish shu yulni uzidan edit xam qilsa buladi va add xam
export const contact_one: string = `${base_url}contact/`; //bitta contact ni get qilish id keladi va delete qilsa xam buladi

//================CATEGORY CONTROLLER====================== 8 ta api


//================AUTH CONTROLLER======================
export const auth_reset_password: string = `${base_url}auth/reset-password`; //parolni qayta tiklash
export const auth_forgot_password: string = `${base_url}auth/forgot-password`; //parolni unitish
export const auth_activate: string = `${base_url}auth/activate`; //?????? bilmadim
export const auth_register: string = `${base_url}auth/register`; //user register
export const auth_login: string = `${base_url}auth/login`; //login


//================VIDEO UPLOAD CONTROLLER====================== 4 ta api


//================QUIZ CONTROLLER====================== 2 ta api


//================CERTIFICATE CONTROLLER====================== 1 ta api


//================STATISTICS CONTROLLER====================== 4 ta api
