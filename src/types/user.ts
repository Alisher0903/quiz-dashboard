export interface User {
    categoryData: null | userList[]
    setCategoryData: (val: null | userList[]) => void
}
export interface userList {
    id: number,
    fullName: string,
    categoryName: string,
    email: string
}