const { validationResult } = require('express-validator');
const offerService = require('../services/offer');

const create = async (req, res, next) => { 

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let data = {
        name: req.body.name,
        defaultOffer: req.body.defaultOffer,
        description: req.body.description,
        image: req.body.image,
        
        campaignId: req.body.campaignId,

        offerUrl: req.body.offerUrl,
        goal: req.body.goal,

        brandName: req.body.brandName,
        
        headline: req.body.headline,
        subtitle: req.body.subtitle,

        kickerUrl: req.body.kickerUrl,
        kickerClass: req.body.kickerClass,
        segmentationTags: req.body.segmentationTags,
        documentationTags: req.body.documentationTags,
        uuid: req.body.uuid,
        author: req.body.author,
        authorLink: req.body.authorLink,
        footerUrl: req.body.footerUrl,
        photoAuthor: req.body.photoAuthor,
        copyright: req.body.copyright
    }

    try{

        const offer = await offerService.create(data);
        return res.json(offer);

    }catch(e){
      console.error(e);
      return res.status(422).json({
          errors: [
              {
              msg: e
              }
          ]
      });
    }
}

const update = async (req, res, next) => { 

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
  }


  let data = {
      name: req.body.name,
      defaultOffer: req.body.defaultOffer,
      description: req.body.description,
      image: req.body.image,
      campaignId: req.body.campaignId,

      offerUrl: req.body.offerUrl,
      goal: req.body.goal,

      brandName: req.body.brandName,
      
      headline: req.body.headline,
      subtitle: req.body.subtitle,

      kickerUrl: req.body.kickerUrl,
      kickerClass: req.body.kickerClass,
      segmentationTags: req.body.segmentationTags,
      documentationTags: req.body.documentationTags,
      uuid: req.body.uuid,
      author: req.body.author,
      authorLink: req.body.authorLink,
      footerUrl: req.body.footerUrl,
      photoAuthor: req.body.photoAuthor,
      copyright: req.body.copyright

  }
  

  try{

      const offer = await offerService.update(req.params.id, data);

      return res.json(offer);

  }catch(e){
    console.error(e);
    return res.status(422).json({
        errors: [
            {
            msg: e
            }
        ]
    });
  }
}

const remove = async (req, res, next) => { 

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try{
  
        const offer = await offerService.remove(req.params.id);  
        return res.json({
            id: offer.id 
        });
    }catch(e){
      console.error(e);
      return res.status(422).json({
          errors: [
              {
              msg: e
              }
          ]
      });
    }
}

const launchPause = async (req, res, next) => {
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    try {
        let status = false;
        if (req.params.action === 'launch'){
            status = await offerService.launchOffer(req.params.id)
            return res.json({result: (status) ? 'ok': 'ko'});
        } else if (req.params.action === 'pause'){
            status = await offerService.pauseOffer(req.params.id);
            return res.json({result: (status) ? 'ok': 'ko'});
        } else
            throw('Wrong action')        
    } catch (e) {
        console.error(e);
        return res.status(422).json({
            errors: [{
                msg: e
            }]
        });
    }
}

module.exports = {
    create, 
    update,
    remove,
    launchPause
}