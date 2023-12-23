export type User = {
    email: string
    password: string
}

const users: User[] = [
    
]

export const signup = (email: string, password: string): Promise<{ email: string, token: string, ok: boolean }> => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            if (users.find(user => user.email === email)) return reject(new Error('Duplicated User!'))
            users.push({ email, password });
            resolve({ email, token: '1234', ok: true })
        }, 1000);

    })

}

export const login =  (email: string, password: string): Promise<{ email: string, token: string, ok: boolean }> => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            const user = users.find(user => user.email === email)
            if (!user) return reject(new Error('User not found!'))
            
            resolve({ email: user?.email, token: '4567', ok: true })
        }, 1000);

    })

}