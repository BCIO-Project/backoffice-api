const isActiveCampaign = (campaign) =>{
    return campaign.status === 'LIVE';
}

module.exports = {
    isActiveCampaign
}