import {UIStore} from './UIStore';

class IndexDB{

    private dbName: string = 'svgData';//数据库名称
    private version: number = 1;//数据库版本
    private tableName: string = 'svgPath';//数据表名称
    private db: IDBDatabase | null = null;

    //打开数据库
    openDB = () => {
        return new Promise((resolve,reject)=>{
            const request = window.indexedDB.open(this.dbName, this.version);

            request.onsuccess = (event: any) => {//数据库打开成功
                console.log('成功打开数据库')
                this.db = event.target.result
                resolve(1);
            };
    
            request.onupgradeneeded = (event:any) => {
                console.log('成功新建数据库')
                this.db = event.target.result;
                this.create_table(this.db);
            }
    
            request.onerror = (event:any) => {
                console.log('数据库打开报错');
                reject(1);
            };
        })
        
    }

    //新建数据表
    create_table  = (idb: any) => {
        if (!idb.objectStoreNames.contains(this.tableName)) {
            let objectStore;
            objectStore = idb.createObjectStore(this.tableName, { keyPath: 'id' });
            objectStore.createIndex('id', 'id', { unique: true });
        }
    }
    //向indexdb中增加数据
    add  = (path:any) => {
        if(this.db){
            let request = this.db.transaction([this.tableName], 'readwrite')
            .objectStore(this.tableName)
            .add(path);
            request.onsuccess = function (event:any) {
                console.log('数据写入成功');
            };
    
            request.onerror = function (event:any) {
                console.log('数据写入失败');
            }
        } 
    }
    //读取所有数据
    readAll = () => {
            return new Promise((resolve,reject)=>{
                if(this.db){
                    let objectStore = this.db.transaction(this.tableName).objectStore(this.tableName);
                    objectStore.openCursor().onsuccess = function (event:any) {
                        var cursor = event.target.result;
                        if (cursor) {
                            UIStore.initPathList(cursor.key,cursor.value);
                            cursor.continue();
                        } else {
                            console.log('没有更多数据了！');
                            resolve(1);
                        }
                    };
                }
                else{
                    reject();
                }
            })
    }

    //更新数据
    update = (newPath:any)=> {
        if(this.db){
            let request = this.db.transaction([this.tableName], 'readwrite')
            .objectStore(this.tableName)
            .put(newPath);

            request.onsuccess = function (event:any) {
                console.log('数据更新成功');
            };

            request.onerror = function (event:any) {
                console.log('数据更新失败');
            }
        }
    }
    //删除数据
    remove = (id:number) => {
        if(this.db){
            let request = this.db.transaction([this.tableName], 'readwrite')
            .objectStore(this.tableName)
            .delete(id);
          request.onsuccess = function (event) {
            console.log('数据删除成功');
          };
        }
    }

}
export const myIndexDB = new IndexDB();