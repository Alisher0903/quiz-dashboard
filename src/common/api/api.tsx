// swagger url => base
const base_url: string = 'http://161.35.214.247:8080/';

// ESLATMA: URL OXRIDA => / QUYILGAN BULSA YOKI ID KETADI YOKI TEXT YANI SEARCHLAR UCHUN

// ==================================GET ME==================================
export const getMeUrl: string = `${base_url}user/get/me`;

//================= USER ISHLATILMAYDI RESULT CONTROLLER====================
export const result_get_all: string = `${base_url}result/users/`; //PAGINATION buladi bu api va yana bittasi detailni kurish uchun  xam ishlatiladi
export const result_get_by_id: string = `${base_url}result/result/`; //PAGINATION buladi bu api va yana bittasi detailni kurish uchun  xam ishlatiladi

//=================REGION CONTROLLER==================== ishlatilmagan
// export const region_get_one: string = `${base_url}region/`; // bita region get qilish id keladi
// export const region_update: string = `${base_url}region/`; // admin region update qiladi id keladi
// export const region_delete: string = `${base_url}region/`; // admin region delete qiladi
// export const region_all: string = `${base_url}region`; // admin or client all region get qiladi
// export const region_add: string = `${base_url}region`; // admin region qushadi

//==============DISTRICT CONTROLLER========================== ishlatilmagan
// export const district_get_all: string = `${base_url}district`; // all district get
// export const district_update: string = `${base_url}district`; // admin district update
// export const district_add: string = `${base_url}district`; // admin district add
// export const district_get_one: string = `${base_url}district/`; // bitta district get qilish
// export const district_delete: string = `${base_url}district/`; // district delete qilish
// export const district_region_filter: string = `${base_url}district/districts/`; // districtni region lar id buyicha get qilish

//=================QUESTION CONTROLLER===================
export const question_crud: string = `${base_url}question`; //admin question crud
export const question_search: string = `${base_url}question/searchText/?searchText=`; //admin or client question search qiladi
export const question_category_all: string = `${base_url}question/list/`; //admin category buyicha question get qiladi
export const question_get_all: string = `${base_url}question/getAllQuestions`; //admin category buyicha question get qiladi
export const question_type_filter: string = `${base_url}question/byType?type=`; //admin category buyicha question get qiladi

//================CONTACT CONTROLLER====================== ishlatilmagan
// export const contact_all: string = `${base_url}contact`; //all contact ni get qilish shu yulni uzidan edit xam qilsa buladi va add xam
// export const contact_one: string = `${base_url}contact/`; //bitta contact ni get qilish id keladi va delete qilsa xam buladi

//================CATEGORY CONTROLLER======================
export const category_all: string = `${base_url}category`; // all catygory client and admin get save update qilish uchun
export const category_admin: string = `${base_url}category/list`; // all catygory client and admin get save update qilish uchun
export const category_MAIN: string = `${base_url}category/main`; // Admin catycoryning asosiy savolarini get qilishi uchun

//================AUTH CONTROLLER======================
export const auth_reset_password: string = `${base_url}auth/reset-password`; //parolni qayta tiklash
export const auth_forgot_password: string = `${base_url}auth/forgot-password`; //parolni unitish
export const auth_activate: string = `${base_url}auth/activate`; //?????? bilmadim
export const auth_register: string = `${base_url}auth/register`; //user register
export const auth_login: string = `${base_url}auth/login`; //login

//================VIDEO UPLOAD CONTROLLER====================== 4 ta api
export const api_videos_upload: string = `${base_url}api/videos/upload`; // Video apload qilish admin busa kere
export const api_videos_files: string = `${base_url}api/videos/files/`; // video get qilish client uchun busa kerak
export const api_videos_files_update: string = `${base_url}api/videos/update/`; // video update qilish c
export const api_videos_delete: string = `${base_url}api/videos/delete/`; // video delete qilish Id bilan

//================QUIZ CONTROLLER======================
export const quiz_pass: string = `${base_url}quiz/pass`; // Client Testni Submit qilishi uchun
export const quiz_start: string = `${base_url}quiz/start/`; // Client Testni Boshlash uchun qilishi uchun

//================CERTIFICATE CONTROLLER====================== 1 ta api
export const certificate: string = `${base_url}certificate/`; // Client result olishi uchun

//================STATISTICS CONTROLLER======================
export const statistics_day: string = `${base_url}statistic/dayOfWeek/`; // Client result olishi uchun
export const statistics_categoryBy: string = `${base_url}statistic/categoryBy/`; // Client result olishi uchun
export const statistics_card: string = `${base_url}statistic/countAll`; // Client result olishi uchun