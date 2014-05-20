//
//  APIClient.m
//  WeaponSmith
//
//  Created by Ono Masashi on 2014/05/20.
//  Copyright (c) 2014年 akisute. All rights reserved.
//

#import "APIClient.h"

@interface APIClient ()
@property (nonatomic) NSOperationQueue *operationQueue;
@end

@implementation APIClient

+ (instancetype)sharedClient
{
    static id instance;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[self alloc] init];
    });
    return instance;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.operationQueue = [[NSOperationQueue alloc] init];
    }
    return self;
}

- (BFTask *)getNewWeaponAsync
{
    BFTaskCompletionSource *task = [BFTaskCompletionSource taskCompletionSource];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://api.parse.com/1/functions/get_new_weapon"]
                                                           cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                       timeoutInterval:15.0];
    [request setHTTPMethod:@"POST"];
    [request setAllHTTPHeaderFields:@{@"X-Parse-Application-Id": @"bSd79gbuQxsyvL1mEF16i9EB58fxr9wQJmLleSG5",
                                      @"X-Parse-REST-API-Key": @"YrmzQ8SmBwmrwlf4nRzOMeJnHkSXjbmNHb108Ds5",
                                      @"Content-Type": @"application/json"}];
    [request setHTTPBody:[NSJSONSerialization dataWithJSONObject:@{} options:0 error:NULL]];
    [NSURLConnection sendAsynchronousRequest:request
                                       queue:self.operationQueue
                           completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {
                               if (connectionError) {
                                   [task setError:connectionError];
                               } else {
                                   NSError *jsonError = nil;
                                   id jsonObject = [NSJSONSerialization JSONObjectWithData:data options:0 error:&jsonError];
                                   if (jsonError) {
                                       [task setError:jsonError];
                                   } else {
                                       [task setResult:jsonObject];
                                   }
                               }
                           }];
    return task.task;
}

@end
