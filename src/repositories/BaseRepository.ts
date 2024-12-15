export class BaseRepository {
    private readonly baseUrl: string;
    private readonly authHeader: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;

        // Закодированное сочетание логина и пароля в Base64 (UTF-8)
        const credentials = this.encodeBase64('Коптев ДС','');
        this.authHeader = `Basic ${credentials}`;
    }

    private encodeBase64(login: string, password: string): string {
        return btoa(unescape(encodeURIComponent(`${login}:${password}`)));
    }

    private getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': this.authHeader,
        };
    }

    async get<T>(url: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: 'GET',
            headers: this.getHeaders(),
            mode: 'no-cors',
        });

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
        }

        return response.json();
    }

    async post<T>(url: string, data: unknown): Promise<T> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
            mode: 'no-cors',
        });

        if (!response.ok) {
            throw new Error(`Error posting data: ${response.status}`);
        }

        return response.json();
    }

    async path<T>(url: string, data: unknown): Promise<T> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: 'PATCH',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
            mode: 'no-cors',
        });

        if (!response.ok) {
            throw new Error(`Error updating data: ${response.status}`);
        }

        return response.json();
    }

    async delete(url: string): Promise<void> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
            mode: 'no-cors',
        });

        if (!response.ok) {
            throw new Error(`Error deleting data: ${response.status}`);
        }
    }
}
