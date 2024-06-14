export interface ICheckBtnData{
  dataList : dataListForm[],
  typeBouton : 'radio' | 'checkbox'
}



export interface dataListForm{
  libelle : string,
  valeur : string | boolean | number
}
