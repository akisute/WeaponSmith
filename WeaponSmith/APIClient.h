//
//  APIClient.h
//  WeaponSmith
//
//  Created by Ono Masashi on 2014/05/20.
//  Copyright (c) 2014年 akisute. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <Bolts/Bolts.h>

@interface APIClient : NSObject

+ (instancetype)sharedClient;

- (BFTask *)getNewWeaponAsync;

@end
