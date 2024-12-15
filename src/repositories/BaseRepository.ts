export class BaseRepository {
    private readonly baseUrl: string;
    private readonly authHeader: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;

        // Закодированное сочетание логина и пароля в Base64
        const credentials = btoa('Коптев ДС:');
        this.authHeader = `Basic ${credentials}`;
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
        });

        if (!response.ok) {
            throw new Error(`Error deleting data: ${response.status}`);
        }
    }
}
