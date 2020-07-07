class Auth {
  constructor() {
    this.authenticated = false;
    this.tenant_id = '';
    this.username = '';
  }
  setToken(data) {
    console.log(data);
    const expires = new Date(data.expires);
    const item = {
      value: data.token,
      expiry: expires,
      tenantId: data.tenant_id,
      username: data.username
    }
    localStorage.setItem("token", JSON.stringify(item));
  }

  getTenentID() {
    const token = localStorage.getItem('token');
    if(token) {
      if(this.tokenExpirityChecking(token)) {
        const item = JSON.parse(token);
        this.tenant_id = item.tenantId;
        return this.tenant_id;
      }
      return null;
    }
    return null;
  }

  getUserName() {
    const token = localStorage.getItem('token');
    if(token) {
      if(this.tokenExpirityChecking(token)) {
        const item = JSON.parse(token);
        this.username = item.username;
        return this.username;
      }
      return null;
    }
    return null;
  }
  tokenExpirityChecking(token) {
    const item = JSON.parse(token);
    const now = new Date();
    const expiry = new Date(item.expiry);
    if(now.getTime() > expiry.getTime()) {
      localStorage.removeItem("token");
      return false
    } 
    return true;
    
  }
  isAuthenticated() {
    const token = localStorage.getItem('token');
    if(token) {
      if(this.tokenExpirityChecking(token)) {
        this.authenticated = true;
        return this.authenticated;
      } 
      return false
    }
    return false;
  }
}
export default new Auth();