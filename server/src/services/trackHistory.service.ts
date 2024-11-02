import { TrackHistoryDto } from "@/dto/trackHistory.dto";
import { ITrackHistory } from "@/interfaces/trackHistory.interface";
import { TrackHistoryRepository } from "@/repositories/trackHistory.repository";
import { UserRepository } from "@/repositories/user.repository";

export class TrackHistoryService {
    private repository:TrackHistoryRepository;
    private userRepository: UserRepository;

    constructor() {
        this.repository = new TrackHistoryRepository();
        this.userRepository = new UserRepository();
    }

    async getTrackHistory() {
        return await this.repository.getTrackHistory();
    }

    async getTrackHistoryByUser(token: string) {
        const user = await this.userRepository.getUserByToken(token);
        if (!user) {
            throw new Error('Unauthorized');
        }
        return await this.repository.getTrackHistoryByUser(user.id);
    }
    
    async createTrackHistory (token: string, trackHistoryDto: TrackHistoryDto): Promise<ITrackHistory | null> {
        const user = await this.userRepository.getUserByToken(token);
        if (!user) {
            throw new Error('Unauthorized');
        }
        return await this.repository.createTrackHistory(trackHistoryDto, user.id);
    };
}