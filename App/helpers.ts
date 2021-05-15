export function composeClasses(...cls : any[]) : string {
    return cls.map( val  => {
        if(typeof val === 'string' && val.length) {
            return val
        }
        return ''
    }).join(' ');
}