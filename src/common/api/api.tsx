// swagger url => base
const base_url: string = 'http://161.35.214.247:8080/';

// ESLATMA: URL OXRIDA => / QUYILGAN BULSA YOKI ID KETADI YOKI TEXT YANI SEARCHLAR UCHUN
// ============ ALL 50 TA API =============

//=================USER CONTROLLER====================
export const client_update: string = `${base_url}user/update/`; //id kirib keladi
export const client_get_all: string = `${base_url}user`; //admin all client get qiladi
export const client_get_one: string = `${base_url}user/`; //admin bitta client get qiladi

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

//================CONTACT CONTROLLER====================== 5 ta api


//================CATEGORY CONTROLLER====================== 8 ta api


//================AUTH CONTROLLER====================== 5 ta api


//================VIDEO UPLOAD CONTROLLER====================== 4 ta api


//================QUIZ CONTROLLER====================== 2 ta api


//================CERTIFICATE CONTROLLER====================== 1 ta api


//================STATISTICS CONTROLLER====================== 4 ta api


//================RESULT CONTROLLER====================== 2 ta api
