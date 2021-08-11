import { message } from 'antd';
import axios from 'axios';

var ajax_url = '//esafety.actsyn.com/api';

export default class ajax{
    static message(resp, key){
      if(!resp || !resp.statusText) return;
      var type = resp.status==200 ? 'success' : 'error'; 
      message[type]({content: resp.statusText, key});
    }

    static run(path, method = 'get', showLoading, params){
      var key = Math.random() * 10000; 
      if(!path) path = window.location.hash.substr(1);
      if(showLoading) message.loading({content: 'Submitting...', key, duration: 0});
      return new Promise(async (resolve, reject)=>{
        try{ 
          var r = await axios({method, url: ajax_url + path, ...params});      
          if(showLoading) this.message(r,key);  
          resolve(r.data);
        }catch(e){ 
          this.message(e.response,key); 
          reject('Error');
        }
      });
    }

    static async post(path, params, formRef){ 
      var form = new FormData(formRef);
      if(params) setFormData(form, params); 
      return this.run(path, 'POST', true, {data: form, headers: {'Content-Type': 'multipart/form-data'}});    
    }

    static async delete(path){ 
      return this.run(path,'DELETE', true,{crossdomain: true, referrerPolicy: 'no-referrer-when-downgrade'});
    }

    static async get(path, params = {}, formRef){
      var form = new FormData(formRef);
      form.forEach(function(value, key){ params[key] = value; });
      return this.run(path, 'GET', false, {params}); 
    }
}

export function setFormData(formData, data, previousKey) {
    if (data instanceof Object) {
      Object.keys(data).forEach(key => {
        const value = data[key];

        if (value instanceof Object && !Array.isArray(value) && !(value instanceof File)) { 
          return setFormData(formData, value, key); 
        }
        if (previousKey) { key = `${previousKey}[${key}]`; }
        if (Array.isArray(value)) { 
          value.forEach((val, i) => {
            var k = `${key}[${i}]`;
            if(val instanceof Object && !Array.isArray(value)) setFormData(formData, val, k)
            else  formData.append(k, val); 
          }); 
        } 
        else { formData.append(key, value); }
      });
    }
    return formData 
}
