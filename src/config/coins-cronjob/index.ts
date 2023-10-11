import cron from 'node-cron';
import coinsService from '../../api/coins/coins.service';

function coins_cronjob() {
    coinsService.createCoins().then(() => {
        console.log('Initial coins creation');
    });
    cron.schedule('* * * * *', () => {
        coinsService.createCoins().then(() => {
            console.log('Coins regeneration');
        });
    });
}

export default coins_cronjob;
