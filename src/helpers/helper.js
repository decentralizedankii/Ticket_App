
import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


export function createNotification(type,message,title='Seed4me')
{
    switch (type) 
    {
      case 'info':
        NotificationManager.info(message,title,1000);
        break;
      case 'success':
        NotificationManager.success(message,title,1000);
        break;
      case 'warning':
        NotificationManager.warning(message,title,1000);
        break;
      case 'error':
        NotificationManager.error(message,title,1000);
        break;
    }
    
}

export function apiUrl()
{
  return "http://52.14.185.147:8080/";
  // return "http://localhost:8080/";
}


export function baseUrl()
{
  return "http://52.14.185.147:8080/";
  // return "http://localhost:8080/";
}
