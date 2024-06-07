export interface INotification{
  type : 'success' | 'error' | 'info' | 'warning'| '404' | '403' | '500'
  titre? : string
  message : string
  bouton1? : {
    label : string,
    lien : string
  }
  bouton2? : {
    label : string,
    lien? : string
  }
}

export interface INotificationBtn{
  bouton1 : {
    label : string,
    lien : string
  }
  bouton2 : {
    label_? : String,
    lien? : string
  }
}
